<script setup lang="ts">
import { Ref, ref } from 'vue'

import { Day } from '../models/months'

import AprilData from '../../data/months/April.json'
import MayData from '../../data/months/May.json'
import JuneData from '../../data/months/June.json'
import JulyData from '../../data/months/July.json'
import AugustData from '../../data/months/August.json'
import SeptemberData from '../../data/months/September.json'
import OctoberData from '../../data/months/October.json'
import NovemberData from '../../data/months/November.json'

const months = [
  ...AprilData,
  ...MayData,
  ...JuneData,
  ...JulyData,
  ...AugustData,
  ...SeptemberData,
  ...OctoberData,
  ...NovemberData
]

const days: Ref<Day[]> = ref(months);

const countUniqueOccurrences = (array) => {
  return array.reduce((count, item) => {
    if (item in count) {
      count[item]++;
    } else {
      count[item] = 1;
    }
    return count;
  }, {});
}

const allOpportunities = months.map(day => {
  return [...day.day.confidants.split('\n'), ...day.night.confidants.split('\n')].filter(a => !!a)
})

const flattened = allOpportunities.reduce((arr, next) => {
  arr = [...arr, ...next]
  return arr
}, [])

const unique = [...new Set(flattened)]

console.log(unique)

const trimmed = flattened.map(a => a.trim())

const filtered = trimmed.filter(a => a.includes(' - '))

const occurences = countUniqueOccurrences(filtered)

const sortedArcanas = Object.keys(occurences).sort((a, b) => {
  return occurences[b] - occurences[a]
})

console.log(occurences)

</script>

<template>
  <div class="confidants">
    <div v-for="arcana in sortedArcanas">
      {{ arcana }} - {{ occurences[arcana] }}
    </div>
  </div>
</template>

<style>

</style>
