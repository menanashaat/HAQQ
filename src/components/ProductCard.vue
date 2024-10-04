<template>
  <div
    class="products__card"
    draggable="true"
    @dragstart="onDragStart"
    @dragover.prevent
    @drop="onDrop"
    @click="showDetails"
  >
    <img fit="cover" :src="image" alt="product image" class="products__card__image" />
    <h3>{{ title }}</h3>
    <p>Price: ${{ price }}</p>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps } from 'vue'

// Define props for the product card
const props = defineProps({
  image: String,
  title: String,
  price: Number,
  index: Number
})

// Define emits for handling drag events and showing details
const emit = defineEmits(['dragstart', 'drop', 'showDetails'])

const onDragStart = () => {
  emit('dragstart', props.index)
}

const onDrop = () => {
  emit('drop', props.index)
}

const showDetails = () => {
  emit('showDetails')
}
</script>

<style lang="scss">
.products__card {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 16px;
  width: 23%; /* To fit exactly 4 cards per row */
  margin-bottom: 20px;
  text-align: center;

  &__image {
    width: -webkit-fill-available;
    max-height: 16rem;
    min-height: 16rem;
    mix-blend-mode: multiply;
  }
}
/* Responsive adjustments */
@media (max-width: 768px) {
  .products__card {
    flex: 1 1 calc(50% - 20px); /* 2 cards per row for medium screens */
  }
}

@media (max-width: 480px) {
  .products__card {
    flex: 1 1 calc(100% - 20px); /* 1 card per row for small screens */
  }
}
</style>
