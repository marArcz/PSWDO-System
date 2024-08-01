<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title inertia>{{ config('app.name', 'Laravel') }}</title>

        <!-- Fonts -->
        <!-- <link rel="preconnect" href="https://fonts.bunny.net"> -->
        <!-- <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" /> -->
        <!-- <link rel="stylesheet" href="/assets/fonts/Figtree/Figtree-VariableFont_wght.ttf"> -->
        <!-- <link rel="stylesheet" href="/assets/fonts/Figtree/static/Figtree-Bold.ttf"> -->
        <!-- <link rel="stylesheet" href="/assets/fonts/Figtree/static/Figtree-Medium.ttf"> -->
        <link rel='stylesheet' href='/assets/uicons/css/uicons-regular-rounded.css'>
        <!-- Scripts -->
        <link rel="shortcut icon" href="/images/logo.png" type="image/x-icon">
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx",'resources/fonts/Figtree/static/Figtree-Regular.ttf'])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia
    </body>
</html>
