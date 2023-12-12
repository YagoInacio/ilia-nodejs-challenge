import { ObjectId } from 'bson';
import { Replace } from 'src/helpers/Replace';
import { Email } from './email';

export interface UserProps {
  firstName: string;
  lastName: string;
  email: Email;
  password: string;
  confirmed: boolean;
  active: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private _id: string;
  private props: UserProps;

  constructor(
    props: Replace<
      UserProps,
      {
        confirmed?: boolean;
        active?: boolean;
        createdAt?: Date;
        updatedAt?: Date;
      }
    >,
    id?: string,
  ) {
    this._id = id ?? new ObjectId().toHexString();
    this.props = {
      ...props,
      confirmed: props.confirmed ?? false,
      active: props.active ?? true,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
  }

  public get id(): string {
    return this._id;
  }

  public set firstName(value: string) {
    this.props.firstName = value;
    this.update();
  }

  public get firstName(): string {
    return this.props.firstName;
  }

  public set lastName(value: string) {
    this.props.lastName = value;
    this.update();
  }

  public get lastName(): string {
    return this.props.lastName;
  }

  public set email(email: Email) {
    this.props.email = email;
    this.update();
  }

  public get email(): Email {
    return this.props.email;
  }

  public set password(value: string) {
    this.props.password = value;
    this.update();
  }

  public get password(): string {
    return this.props.password;
  }

  public set confirmed(value: boolean) {
    this.props.confirmed = value;
    this.update();
  }

  public get confirmed(): boolean {
    return this.props.confirmed;
  }

  public set active(value: boolean) {
    this.props.active = value;
    this.update();
  }

  public get active(): boolean {
    return this.props.active;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  private update() {
    this.props.updatedAt = new Date();
  }
}
