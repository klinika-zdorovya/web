<template>
  <div class="font-semibold uppercase text-color-typography dark:text-color-typography__dark text-xs md:text-sm leading-5">
    {{ formattedDate }} • {{ formattedName }}
  </div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    date: {
      type: [String, Date],
      required: true
    }
  },

  computed: {
    parsedDate() {
      if (typeof this.date === 'string') {
        const [day, month, year] = this.date.split('.')
        return new Date(year, month - 1, day)
      }

      return this.date;
    },

    formattedDate() {
      if (!this.parsedDate) return '';

      const day = this.parsedDate.getDate();
      const month = new Intl.DateTimeFormat('ru-RU', { month: 'long' })
          .format(this.parsedDate)
          .toUpperCase()
      const year = this.parsedDate.getFullYear();

      return `${day} ${month} ${year} ГОДА`;
    },

    formattedName() {
      return this.name.toUpperCase();
    }
  }
}
</script>