import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { WalletModel } from 'app/models/wallet.model';
import { initSupabase } from '../utils/initSupabase';

@Injectable({
  providedIn: 'root'
})
export class WalletsSupaService {
  supabase: SupabaseClient = createClient(initSupabase.supabaseUrl, initSupabase.supabaseKey);

  constructor() { }

  async addWallet(wallet: WalletModel) {
    const { data, error } = await this.supabase
      .from<WalletModel>('wallets')
      .insert(wallet)
    return { data, error };
  }

  async getWallets() {
    let { data: wallets, error } = await this.supabase
      .from<WalletModel>('wallets')
      .select('*')
    return { wallets, error };
  }

  async deleteWallet(id: number) {
    const data = await this.supabase
      .from('wallets')
      .delete()
      .match({ id: id })
    return data
  }

  async update(wallet: WalletModel) {
    const { data, error } = await this.supabase
      .from('wallets')
      .update(wallet)
      .match({ id: wallet.id })
  }

  // async updateCheck(wallet: WalletModel) {
  //   const { data, error } = await this.supabase
  //     .from('wallets')
  //     .update({ done: wallet.done })
  //     .match({ id: wallet.id })
  // }

  listenAll() {
    const mySubscription = this.supabase
      .from('wallets')
      .on('*', payload => {
        console.log('Change received!', payload)
      })
      .subscribe()
    return mySubscription;
  }
}
