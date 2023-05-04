import { Column, Entity, OneToMany } from 'typeorm';
import { Vattu } from './Vattu.entity';

@Entity('donvitinh', { schema: 'ketoan' })
export class Donvitinh {
  @Column('varchar', { primary: true, name: 'MaDVT', length: 50 })
  maDvt: string;

  @Column('varchar', { name: 'TenDVT', length: 50 })
  tenDvt: string;

  @OneToMany(() => Vattu, (vattu) => vattu.maDvt2)
  vattus: Vattu[];
}
