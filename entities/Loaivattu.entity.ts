import { Column, Entity, OneToMany } from 'typeorm';
import { Vattu } from './Vattu.entity';

@Entity('loaivattu', { schema: 'ketoan' })
export class Loaivattu {
  @Column('varchar', { primary: true, name: 'MaLoai', length: 50 })
  maLoai: string;

  @Column('varchar', { name: 'TenLoai', length: 50 })
  tenLoai: string;

  @Column('varchar', { name: 'MoTa', length: 100 })
  moTa: string;

  @OneToMany(() => Vattu, (vattu) => vattu.maLoai2)
  vattus: Vattu[];
}
