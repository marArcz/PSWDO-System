import { useEffect } from 'react';
import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import Card from '@/Components/Card';
import Container from '@/Components/Container';
import ApplicationLogo from '@/Components/ApplicationLogo';
import { Button, Image } from 'react-bootstrap';

export default function Login({ auth, status, canResetPassword }) {

    const { flash } = usePage().props;

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('lguAdmin.auth.login'));
    };

    return (
        <div className='bg-light auth-page'>
            <Head title="Log in" />
            <div className="auth-bg-wrapper">
                <div className="bg"></div>
                <div className="logo-area d-flex items-center justify-center">
                    <div className="">
                        <div className="text-center">
                            <Image
                                width={120}
                                src='/images/logo.png'
                                className='mx-auto'
                            />
                            <p className="text-sm fw-bold mt-3">
                                LGU Portal
                            </p>
                            <p className="text-sm text-secondary">Calamity Assistance Requests Management</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="auth-form">
                <div className="col-lg-3 col-md-5 col-11 mx-auto shadow">
                    <Card className="shadow" rounded='4'>
                        <div className="p-2">
                            <div className="text-center mb-[30px]">
                                <p className='fw-semibold w-max mx-auto border-b-2 border-b-blue-800 text-lg'>LGU ADMIN</p>
                                <p className='text-sm'>Login to your account.</p>
                            </div>
                            {flash?.error && <div className="mb-3 text-start fw-bold font-medium text-sm text-danger">{flash.error}</div>}

                            <form onSubmit={submit}>
                                <div>
                                    <div className="flex justify-between">
                                        <InputLabel htmlFor="email" value="Email Address:" />
                                        <i className='fi fi-rr-user'></i>
                                    </div>
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

                                <div className="mt-4">
                                    <div className="flex justify-between">
                                        <InputLabel htmlFor="password" value="Password:" />
                                        <i className='fi fi-rr-lock'></i>
                                    </div>
                                    <TextInput
                                        id="password"
                                        type="password"
                                        name="password"
                                        value={data.password}
                                        className="mt-1 block w-full"
                                        autoComplete="current-password"
                                        onChange={(e) => setData('password', e.target.value)}
                                    />

                                    <InputError message={errors.password} className="mt-2" />
                                </div>

                                <div className="block mt-4">
                                    <label className="flex items-center">
                                        <Checkbox
                                            name="remember"
                                            checked={data.remember}
                                            onChange={(e) => setData('remember', e.target.checked)}
                                        />
                                        <span className="ml-2 text-sm text-gray-600">Remember me</span>
                                    </label>
                                </div>

                                <div className="flex items-center justify-end mt-4">
                                    {canResetPassword && (
                                        <Link
                                            href={route('password.request')}
                                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                        >
                                            Forgot your password?
                                        </Link>
                                    )}

                                    <Button className="col-12 rounded-pill mb-3" type='submit' disabled={processing}>
                                        Log in
                                    </Button>
                                </div>
                                <div className="text-center mt-3 text-sm">
                                    <Link>Forgot Password?</Link>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
