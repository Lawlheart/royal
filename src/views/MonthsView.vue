<script setup lang="ts">
import { ref } from 'vue'

import AprilData from '../../data/months/April.json'
import MayData from '../../data/months/May.json'
import JuneData from '../../data/months/June.json'
import JulyData from '../../data/months/July.json'
import AugustData from '../../data/months/August.json'
import SeptemberData from '../../data/months/September.json'
import OctoberData from '../../data/months/October.json'
import NovemberData from '../../data/months/November.json'

const months = ref([
  {
    name: 'April',
    data: AprilData
  },
  {
    name: 'May',
    data: MayData
  },
  {
    name: 'June',
    data: JuneData
  },
  {
    name: 'July',
    data: JulyData
  },
  {
    name: 'August',
    data: AugustData
  },
  {
    name: 'September',
    data: SeptemberData
  },
  {
    name: 'October',
    data: OctoberData
  },
  {
    name: 'November',
    data: NovemberData
  }
]);

</script>

<template>
  <div class="months">
    <div class="month" v-for="month in months" :key="month.name">
      <h2>{{ month.name }}</h2>
      <section class="days">
        <div class="day" v-for="day in month.data" :key="day.date">
          <h3>{{ day.weekday }} {{ day.date }}</h3>
          <!-- <p>{{ day.description }}</p> -->
          <ng-container v-for="slot in ['day', 'night']" :key="slot">
            <section class="time-item" v-if="day[slot]">
              <h4>{{ day[slot].time }} - {{ day[slot].weather }}</h4>
              <div class="confidants">
                <div v-for="confidant in day[slot].confidants.split('\n')">{{ confidant }}</div>
              </div>
              
            </section>
          </ng-container>

        </div>
      </section>
      
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .months {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
}

.day {
  display: flex;
  flex-direction: row;
  padding: 0.5rem 1rem;
  border: 1px solid #444
}

.time-item {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 1rem 0.5rem 2rem;
  border: 1px solid #444
}

.confidants {
  display: flex;
  flex-direction: column;
  margin-left: 1rem;
}
</style>
