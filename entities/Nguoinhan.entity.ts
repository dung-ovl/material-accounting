import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { Congtrinh } from './Congtrinh.entity';
import { Phieuxuat } from './Phieuxuat.entity';

@Index('FK_NguoiNhan_CongTrinh', ['MaCongTrinh'], {})
@Entity('nguoinhan', { schema: 'ketoan' })
export class Nguoinhan {
  @Column('varchar', { primary: true, name: 'MaNguoiNhan', length: 50 })
  MaNguoiNhan: string;

  @Column('varchar', { name: 'TenNguoiNhan', length: 50 })
  TenNguoiNhan: string;

  @Column('varchar', { name: 'DiaChi', length: 100 })
  DiaChi: string;

  @Column('varchar', { name: 'MaCongTrinh', nullable: true, length: 50 })
  MaCongTrinh: string | null;

  @ManyToOne(() => Congtrinh, (congtrinh) => congtrinh.nguoinhans, {
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn([{ name: 'MaCongTrinh', referencedColumnName: 'MaCongTrinh' }])
  MaCongTrinh2: Congtrinh;

  @OneToMany(() => Phieuxuat, (phieuxuat) => phieuxuat.MaNguoiNhan2)
  phieuxuats: Phieuxuat[];
}
