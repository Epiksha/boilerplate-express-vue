<template>
    <header class="header">
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
                            v-if="(link.gated === undefined) || (link.gated === false && !token) || (link.gated && token)"
                            :key="link.text"
                            class="nav__item"
                        >
                            <router-link
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
