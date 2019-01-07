<template>
  <div id="app">
    <b-navbar
      toggleable="md"
      type="dark"
      variant="secondary"
    >

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="/">ICDC Valencia | SIC</b-navbar-brand>

      <b-collapse
        is-nav
        id="nav_collapse"
      >

        <b-navbar-nav>
          <b-nav-item
            class="nav-item"
            to="/"
          >Escritorio</b-nav-item>
          <b-nav-item to="/members">Miembros</b-nav-item>

        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item>Login</b-nav-item>
          <b-nav-item-dropdown right>
            <!-- Using button-content slot -->
            <template slot="button-content">
              <em>User</em>
            </template>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item href="#">Signout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>

      </b-collapse>
    </b-navbar>
    <router-view />
  </div>
</template>

<style lang="scss">
</style>
