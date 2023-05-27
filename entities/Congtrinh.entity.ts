import { Column, Entity, OneToMany } from 'typeorm';
import { Nguoinhan } from './Nguoinhan.entity';
import { Phieuxuat } from './Phieuxuat.entity';

@Entity('congtrinh', { schema: 'ketoan' })
export class Congtrinh {
  @Column('varchar', { primary: true, name: 'MaCongTrinh', length: 50 })
  MaCongTrinh: string;

  @Column('varchar', { name: 'TenCongTrinh', length: 50 })
  TenCongTrinh: string;

  @Column('varchar', { name: 'DiaChi', length: 100 })
  DiaChi: string;

  @Column('varchar', { name: 'MoTa', length: 100 })
  MoTa: string;

  @OneToMany(() => Nguoinhan, (nguoinhan) => nguoinhan.MaCongTrinh2)
  nguoinhans: Nguoinhan[];

  @OneToMany(() => Phieuxuat, (phieuxuat) => phieuxuat.MaCongTrinh2)
  phieuxuats: Phieuxuat[];
}
