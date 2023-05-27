import { Column, Entity, OneToMany } from 'typeorm';
import { Vattu } from './Vattu.entity';

@Entity('donvitinh', { schema: 'ketoan' })
export class Donvitinh {
  @Column('varchar', { primary: true, name: 'MaDVT', length: 50 })
  MaDVT: string;

  @Column('varchar', { name: 'TenDVT', length: 50 })
  TenDVT: string;

  @OneToMany(() => Vattu, (vattu) => vattu.MaDVT2)
  vattus: Vattu[];
}
