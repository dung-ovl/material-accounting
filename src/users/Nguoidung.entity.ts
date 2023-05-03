import { Bophan } from 'src/departments/Bophan.entity';
import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';

@Index('FK_ND_BP', ['maBoPhan'], {})
@Entity('nguoidung', { schema: 'ketoan' })
export class Nguoidung {
  @Column('varchar', { primary: true, name: 'TenDangNhap', length: 100 })
  tenDangNhap: string;

  @Column('varchar', { name: 'MatKhau', length: 100 })
  matKhau: string;

  @Column('varchar', { name: 'HoTen', nullable: true, length: 100 })
  hoTen: string | null;

  @Column('varchar', { name: 'Quyen', length: 10 })
  quyen: string;

  @Column('varchar', { name: 'MaBoPhan', nullable: true, length: 50 })
  maBoPhan: string | null;

  @ManyToOne(() => Bophan, (bophan) => bophan.nguoidungs, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaBoPhan', referencedColumnName: 'maBoPhan' }])
  maBoPhan2: Bophan;
}
