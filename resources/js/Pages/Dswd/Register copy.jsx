import { useEffect, useState } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';
import Card from '@/Components/Card';
import Container from '@/Components/Container';
import ApplicationLogo from '@/Components/ApplicationLogo';

export default function Login({ status, canResetPassword }) {
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
        <div className='bg-light'>
            <Head title="DSWD Register" />
            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
            <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
                <div className="col-md-6 col-lg-4 col-11 mx-auto">
                    <div className="text-center mb-3">
                        <ApplicationLogo className="w-[100px] h-[100px] mx-auto" />
                    </div>
                    <Card>
                        <p className="text-center fw-bold">PSWDO</p>
                        <p className='mb-3 text-center'>Create an account to manage system.</p>
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
                                    type={showPassword?'text':'password'}
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
                                    type={showPassword?'text':'password'}
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
