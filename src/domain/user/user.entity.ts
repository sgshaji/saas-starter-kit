import type { User } from './user.types';

export class UserEntity {
  constructor(readonly props: User) {}

  get id() {
    return this.props.id;
  }

  get email() {
    return this.props.email;
  }
}
