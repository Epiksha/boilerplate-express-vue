<template>
    <div class="login">
        <div class="login__container container p-4">
            <div class="login__inner">
                <h1>Login</h1>

                <form
                    class="login__form"
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
                        class="mt-4"
                    />

                    <GError
                        v-if="errors.default && errors.default.length"
                        :errors="errors.default"
                    />

                    <div class="login__links">
                        <router-link
                            to="/register"
                        >
                            Don't have an account?
                        </router-link>

                        <router-link
                            to="/"
                        >
                            Back to home
                        </router-link>
                    </div>

                    <button
                        class="button button--login"
                        type="submit"
                        @click.prevent="submit"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>

        <div class="login__image">
            <GImage
                class="image--login"
                name="beach.webp"
            />
        </div>
    </div>
</template>

<script src="./PLogin" />
