import { Bophan } from 'entities/Bophan.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Index('FK_ND_BP', ['MaBoPhan'], {})
@Entity('nguoidung', { schema: 'ketoan' })
export class Nguoidung {
  @Column('varchar', { primary: true, name: 'TenDangNhap', length: 100 })
  TenDangNhap: string;

  @Column('varchar', { name: 'MatKhau', length: 100 })
  MatKhau: string;

  @Column('varchar', { name: 'HoTen', nullable: true, length: 100 })
  HoTen: string | null;

  @Column('varchar', { name: 'Quyen', length: 10 })
  Quyen: string;

  @Column('varchar', { name: 'MaBoPhan', nullable: true, length: 50 })
  MaBoPhan: string | null;

  @ManyToOne(() => Bophan, (bophan) => bophan.nguoidungs, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaBoPhan', referencedColumnName: 'MaBoPhan' }])
  MaBoPhan2: Bophan;
}
