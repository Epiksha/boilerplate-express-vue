<template>
    <div class="login">
        <div class="container py-4">
            <h1>Login</h1>

            <form
                action="submit"
            >
                <GInput
                    id="login-email"
                    v-model="form.email"
                    label="Email"
                    type="email"
                    placeholder="Email"
                    :required="true"
                    :errors="errors && errors.email"
                />
                
                <GInput
                    id="login-password"
                    v-model="form.password"
                    label="Password"
                    type="password"
                    placeholder="Password"
                    :required="true"
                    :errors="errors && errors.password"
                />

                <GError
                    v-if="errors.default && errors.default.length"
                    :errors="errors.default"
                />

                <button
                    class="button"
                    type="submit"
                    @click.prevent="submit"
                >
                    Login
                </button>
            </form>
        </div>
    </div>
</template>

<script src="./PLogin" />
