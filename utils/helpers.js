module.exports = {
    format_date: (date) => {
      // Format date as DD/MM/YYYY
      return `${new Date(date).getDate()}/${new Date(date).getMonth() + 1}/${new Date(date).getFullYear()}`;
    },
}; 