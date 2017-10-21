import { Injectable } from '@angular/core';
import { Playground } from './playground';

@Injectable()
export class PlaygroundService {
  get(): Promise<Playground[]> {
    const playgrounds: Playground[] = [
      { key: 'signin', route: '/signin', title: 'ล็อกอิน', description: 'ล็อกอินทั่ว ๆ ไป' },
      { key: 'slow-signin', route: '/slow-signin',
          title: 'ล็อกอินตอบสนองช้าจัง', description: 'ล็อกอินเหมือนเดิม เพิ่มเติมคือตอบสนองช้ามาก' },
      { key: 'unstable-signin', route: '/unstable-signin',
          title: 'ล็อกอินได้บ้างไม่ได้บ้าง', description: 'API กากมาก ล็อกอินได้บ้างไม่ได้บ้าง' },
      { key: 'create-customer', route: '/user/create-customer',
          title: 'สร้างข้อมูลลูกค้าใหม่', description: 'หน้าฟอร์มสำหรับสร้างข้อมูลลูกค้าใหม่' },
      { key: 'slow-form', route: '/user/intermittently-slow-create-customer',
          title: 'สร้างข้อมูลลูกค้าใหม่ (โหลดช้า)', description: 'หน้าฟอร์มสำหรับสร้างข้อมูลลูกค้าใหม่ รอสักพัก กว่าจะโหลดขึ้น' },
      { key: 'create-user', route: '/user/create-user', title: 'สร้างข้อมูลผู้ใช้ใหม่', description: 'ใช้ Firebase เป็นฐานข้อมูล' },
      { key: 'list-user', route: '/user/list-user', title: 'รายชื่อผู้ใช้', description: 'ใช้ Firebase เป็นฐานข้อมูล' },
    ];
    return Promise.resolve(playgrounds);
  }
}
