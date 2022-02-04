<template>
    <header
        class="header"
        :class="{'deactive': this.$route.fullPath === '/login'}"
    >
        <div class="header__container container">
            <div class="header__logo">
                <router-link
                    class="header__title"
                    to="/"
                >
                    Express | Vue | MongoDB
                </router-link>
            </div>

            <nav class="nav">
                <ul class="nav__list">
                    <template v-for="link in navLinks">
                        <li
                            v-if="(link.isGated === undefined) || (link.isGated === false && !token) || (link.isGated && token)"
                            :key="link.text"
                            class="nav__item"
                        >
                            <button
                                v-if="link.callback"
                                class="nav__link"
                                @click="link.callback.call(link.context)"
                            >
                                {{ link.text }}
                            </button>

                            <router-link
                                v-else
                                :to="link.url"
                                class="nav__link"
                                v-text="link.text"
                            />
                        </li>
                    </template>
                </ul>
            </nav>
        </div>
    </header>
</template>

<script src='./VHeader' />
