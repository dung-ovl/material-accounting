import { Column, Entity, OneToMany } from 'typeorm';
import { Vattu } from './Vattu.entity';

@Entity('loaivattu', { schema: 'ketoan' })
export class Loaivattu {
  @Column('varchar', { primary: true, name: 'MaLoai', length: 50 })
  MaLoai: string;

  @Column('varchar', { name: 'TenLoai', length: 50 })
  TenLoai: string;

  @Column('varchar', { name: 'MoTa', length: 100 })
  MoTa: string;

  @OneToMany(() => Vattu, (vattu) => vattu.MaLoai2)
  vattus: Vattu[];
}
