import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
} from 'typeorm';
import { v4 as uuid } from 'uuid';

import { Tag } from './Tag';
import { User } from './User';

@Entity('compliments')
export class Compliment {
    @PrimaryColumn()
    readonly id?: string;

    @Column()
    user_sender: string;

    @Column()
    user_receiver: string;

    @Column()
    tag_id: string;

    @Column()
    message: string;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Tag)
    @JoinColumn({ name: 'tag_id' })
    tags: Tag;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_sender' })
    userSender = User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_receiver' })
    userReceiver = User;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}
