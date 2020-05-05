from itm.auth.hash import HashService

from itm.documents import User, connect_db

from itm.users.application import CreateUserRequest, CreateUser


def create_user(payload):
    CreateUser(
        user_model=User,
        hash_service=HashService(),
        payload=payload,
    ).execute()


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description='Create new user')
    parser.add_argument('--name')
    parser.add_argument('--email')
    parser.add_argument('--gender')
    parser.add_argument('--password')

    args = parser.parse_args()

    user = CreateUserRequest(**{'displayName': args.name, 'email': args.email,
                                'gender': args.gender, 'password': args.password})

    connect_db()

    create_user(user)

    print('User created successfully')
