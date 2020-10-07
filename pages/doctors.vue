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
      :items="collection"
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
        { text: 'Name', value: 'name' },
        { text: 'Surname', value: 'surname' },
        { text: 'Info', value: 'info' },
        { text: 'Birthday', value: 'birthday' },
        { text: 'Specializations', value: 'specializations' },
        { text: 'Professional statements', value: 'professional_statements' },
        { text: 'Academic degree', value: 'academic_degree' },
        { text: 'Education', value: 'education' },
        { text: 'Languages', value: 'languages' },
        { text: 'Certificates', value: 'certificates' },
        { text: 'Professional memberships', value: 'professional_memberships' }
      ],
      collection: []
    }
  },
  mounted () {
    this.fetchData()
  },
  methods: {
    fetchData () {
      this.$axios.get('api/v2/doctors')
        .then(({ data }) => {
          this.collection = data.payload.doctors
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
