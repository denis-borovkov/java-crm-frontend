<template>
    <div>
        <UPageHero
            title="Java CRM Frontend"
            description="Spring boot java CRM Frontend application"
            :links="[{
        label: 'Sign up',
        to: 'http://localhost:3000/signup',
        size: 'xl'
      }, {
        label: 'Sign in',
        to: 'http://localhost:3000/signin',
        size: 'xl',
        color: 'neutral',
        variant: 'subtle'
      }]"
        />
    </div>
</template>
