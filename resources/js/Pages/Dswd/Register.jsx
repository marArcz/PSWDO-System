import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';
import Card from '@/Components/Card';
import { Image } from 'react-bootstrap';

export default function Register({ status }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        firstname: '',
        lastname: '',
        password_confirmation: ''
    });
    const [showPassword, setShowPassword] = useState(false)

    useEffect(() => {
        return () => {
            console.log(errors)
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('pswdo.create'));
    };

    return (
        <div className='bg-light auth-page'>
            <Head title="Log in" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className="auth-bg-wrapper">
                <div className="image"></div>
                <div className="logo-area d-flex items-center justify-center">
                    <div className="lg:block hidden">
                        <div className="text-center">
                            <Image
                                width={120}
                                src='/images/logo.png'
                            />
                            <p className="text-sm fw-bold mt-3">
                                PSWDO
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="auth-form">
                <div className="col-xl-3 col-lg-5 col-md-6 col-sm-8 col-11 mx-auto shadow">
                    <Card rounded='4'>
                        <div className="text-center mb-[50px]">
                            <p className='fw-bold w-max mx-auto border-b-2 border-b-blue-800 text-lg'>PSWDO</p>
                            <p>Create an account to manage system</p>
                        </div>
                        <form onSubmit={submit}>
                            <div className='mb-3'>
                                <InputLabel htmlFor="firstname" value="Firstname" />
                                <TextInput
                                    id="firstname"
                                    type="text"
                                    name="firstname"
                                    value={data.firstname}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('firstname', e.target.value)}
                                />

                                <InputError message={errors.firstname} className="mt-2" />
                            </div>
                            <div className='mb-3'>
                                <InputLabel htmlFor="lastname" value="Lastname" />
                                <TextInput
                                    id="lastname"
                                    type="text"
                                    name="lastname"
                                    value={data.lastname}
                                    className="mt-1 block w-full"
                                    isFocused={true}
                                    onChange={(e) => setData('lastname', e.target.value)}
                                />

                                <InputError message={errors.lastname} className="mt-2" />
                            </div>
                            <div>
                                <InputLabel htmlFor="email" value="Email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mt-3">
                                <InputLabel htmlFor="password" value="Password" />

                                <TextInput
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>
                            <div className="mt-3">
                                <InputLabel htmlFor="passwordConfirmation" value="Confirm Password" />

                                <TextInput
                                    id="passwordConfirmation"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="block mt-3">
                                <label className="flex items-center">
                                    <Checkbox
                                        name="show-password"
                                        checked={showPassword}
                                        onChange={(e) => setShowPassword(e.target.checked)}
                                    />
                                    <span className="ml-2 text-sm text-gray-600">Show Password</span>
                                </label>
                            </div>
                            <div className="text-end">
                                <PrimaryButton className="mt-3 " disabled={processing}>
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
}
