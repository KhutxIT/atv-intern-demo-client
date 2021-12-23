<template>
<div id="wrapper">
  <div id="page-wrapper">
    <div id="page-inner">
      <FullCalendar :options="calendarOptions" />
    </div>
  </div>
</div>
</template>

<script>

import '@fullcalendar/core/vdom'; // solves problem with Vite
import FullCalendar from '@fullcalendar/vue3';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { ref } from 'vue';

const id = ref(10);

export default {
  components: {
    FullCalendar // make the <FullCalendar> tag available
  },
  props: {
    offworks: Array
  },
  data() {
    return {
      calendarOptions: {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
        initialView: 'dayGridMonth',
        headerToolbar: {
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,dayGridWeek,timeGridDay'
        },
        editable: true,
        selectable: true,
        weekends: true,

        select: this.handleSelect,
        eventClick: this.handleEventClick,
        events: JSON.parse(localStorage.getItem('offworks'))
      },
    }
  },
  methods: {
    handleSelect: (arg) => {
      id.value++;

      const cal = arg.view.calendar;
      cal.unselect();
      cal.addEvent({
        id: `${id.value}`,
        title: `New event ${id.value}`,
        start: arg.start,
        end: arg.end,
        allDay: true
      });
    },
    handleEventClick: (arg) => {
      console.log(arg.event.id);
    },
  }
}
</script>