<template>
    <header
        class="header"
        :class="{'deactive': this.$route.fullPath === '/login'}"
    >
        <div class="header__container tablet:container">
            <div class="header__logo">
                <router-link
                    class="header__title"
                    to="/"
                >
                    Express | Vue | MongoDB
                </router-link>
            </div>

            <button
                ref="hamburger"
                class="hamburger"
                :class="{'active': isNavActive}"
                aria-label="Open menu"
                @click="toggleNavigation"
            >
                <span class="hamburger__line hamburger__line--1" />

                <span class="hamburger__line hamburger__line--2" />

                <span class="hamburger__line hamburger__line--3" />

                <span class="hamburger__line hamburger__line--4" />
            </button>

            <nav
                v-clickaway="closeNavigation"
                class="nav"
                :class="[
                    {'active': isNavActive},
                    {'transitionless': disableTransitions}
                ]"
            >
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
                                :aria-label="`Link to ${link.text}`"
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
