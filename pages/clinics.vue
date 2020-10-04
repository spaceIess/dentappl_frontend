<template>
  <v-card>
    <v-card-title>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      />
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="clinics"
      :search="search"
      :loading="loading"
    >
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      loading: true,
      search: '',
      headers: [
        {
          text: 'ID',
          align: 'start',
          filterable: false,
          value: 'id'
        },
        { text: 'Address', value: 'address' },
        { text: 'Description', value: 'description' },
        { text: 'Email', value: 'email' },
        { text: 'Title', value: 'title' },
        { text: 'Phone', value: 'phone' },
        { text: 'Site', value: 'site' },
        { text: 'Logo', value: 'logo' }
      ],
      clinics: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$axios.get('api/v2/clinics')
        .then(({ data }) => {
          this.clinics = data.payload.clinics
          this.loading = false
        })
        .catch((error) => {
          this.loading = false
          console.log(error)
        })
    }
  }
}
</script>
