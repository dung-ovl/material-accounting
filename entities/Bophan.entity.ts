import { Nguoidung } from 'entities/Nguoidung.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Nhanvien } from './Nhanvien.entity';

@Entity('bophan', { schema: 'ketoan' })
export class Bophan {
  @Column('varchar', { primary: true, name: 'MaBoPhan', length: 50 })
  MaBoPhan: string;

  @Column('varchar', { name: 'TenBoPhan', length: 50 })
  TenBoPhan: string;

  @Column('varchar', { name: 'MoTa', length: 100 })
  MoTa: string;

  @OneToMany(() => Nguoidung, (nguoidung) => nguoidung.MaBoPhan2)
  nguoidungs: Nguoidung[];

  @OneToMany(() => Nhanvien, (nhanvien) => nhanvien.MaBoPhan2)
  nhanviens: Nhanvien[];
}
