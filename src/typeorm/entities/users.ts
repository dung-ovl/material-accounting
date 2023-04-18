import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'nguoidung' })
export class Users {
  @PrimaryColumn({ name: 'TenDangNhap' })
  username: string;

  @Column({ name: 'MatKhau' })
  password: string;

  @Column({ name: 'HoTen', nullable: true })
  name: string;

  @Column({ name: 'Quyen' })
  role: string;

  @Column({ name: 'MaBoPhan', nullable: true })
  department: string;
}
