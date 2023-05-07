import { Nguoidung } from 'entities/Nguoidung.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Nhanvien } from './Nhanvien.entity';

@Entity('bophan', { schema: 'ketoan' })
export class Bophan {
  @Column('varchar', { primary: true, name: 'MaBoPhan', length: 50 })
  maBoPhan: string;

  @Column('varchar', { name: 'TenBoPhan', length: 50 })
  tenBoPhan: string;

  @Column('varchar', { name: 'MoTa', length: 100 })
  moTa: string;

  @OneToMany(() => Nguoidung, (nguoidung) => nguoidung.maBoPhan2)
  nguoidungs: Nguoidung[];

  @OneToMany(() => Nhanvien, (nhanvien) => nhanvien.maBoPhan2)
  nhanviens: Nhanvien[];
}
