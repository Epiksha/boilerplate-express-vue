<template>
    <div class="register">
        <div class="register__container container p-4">
            <div class="register__inner">
                <h1>Register</h1>

                <form
                    class="register__form"
                    action="submit"
                >
                    <GInput
                        id="register-first-name"
                        v-model="form.first_name"
                        label="First Name"
                        type="text"
                        placeholder="First Name"
                        :required="true"
                        :errors="errors && errors.first_name"
                    />
                    
                    <GInput
                        id="register-last-name"
                        v-model="form.last_name"
                        label="Last Name"
                        type="text"
                        placeholder="Last Name"
                        :required="true"
                        :errors="errors && errors.last_name"
                        class="mt-2"
                    />
                    
                    <GInput
                        id="register-email"
                        v-model="form.email"
                        label="Email"
                        type="email"
                        placeholder="Email"
                        :required="true"
                        :errors="errors && errors.email"
                        class="mt-2"
                    />
                    
                    <GInput
                        id="register-password"
                        v-model="form.password"
                        label="Password"
                        type="password"
                        placeholder="Password"
                        :required="true"
                        :errors="errors && errors.password"
                        class="mt-2"
                    />

                    <GError
                        v-if="errors.default && errors.default.length"
                        :errors="errors.default"
                    />

                    <div class="register__links">
                        <router-link
                            to="/login"
                        >
                            Already have an account?
                        </router-link>

                        <router-link
                            to="/"
                        >
                            Back to home
                        </router-link>
                    </div>

                    <button
                        class="button button--register"
                        type="submit"
                        @click.prevent="submit"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>

        <div class="register__image">
            <GImage
                class="image--register"
                name="stairs.webp"
            />
        </div>
    </div>
</template>

<script src="./PRegister" />
