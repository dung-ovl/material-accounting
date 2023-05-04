import { Column, Entity, OneToMany } from 'typeorm';
import { Nguoinhan } from './Nguoinhan.entity';
import { Phieuxuat } from './Phieuxuat.entity';

@Entity('congtrinh', { schema: 'ketoan' })
export class Congtrinh {
  @Column('varchar', { primary: true, name: 'MaCongTrinh', length: 50 })
  maCongTrinh: string;

  @Column('varchar', { name: 'TenCongTrinh', length: 50 })
  tenCongTrinh: string;

  @Column('varchar', { name: 'DiaChi', length: 100 })
  diaChi: string;

  @Column('varchar', { name: 'MoTa', length: 100 })
  moTa: string;

  @OneToMany(() => Nguoinhan, (nguoinhan) => nguoinhan.maCongTrinh2)
  nguoinhans: Nguoinhan[];

  @OneToMany(() => Phieuxuat, (phieuxuat) => phieuxuat.maCongTrinh2)
  phieuxuats: Phieuxuat[];
}
