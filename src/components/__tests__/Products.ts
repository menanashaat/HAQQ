import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../../App.vue'
import ProductModal from '../ProductModal.vue'

describe('App.vue', () => {
  let wrapper: any

  beforeEach(async () => {
    wrapper = mount(App)
    await wrapper.vm.$nextTick() // Wait for products to load
  })

  it('renders a list of products', () => {
    const productCards = wrapper.findAll('.product-card')
    expect(productCards.length).toBeGreaterThan(0) // Ensure products are rendered
  })

  it('displays the "Show More" button when there are more products', () => {
    expect(wrapper.find('.show-more-btn').exists()).toBe(true)
  })

  it('loads more products when "Show More" is clicked', async () => {
    const initialCount = wrapper.vm.displayedCount
    await wrapper.find('.show-more-btn').trigger('click')
    expect(wrapper.vm.displayedCount).toBe(initialCount + 15) // Check the count increases
  })

  it('opens the product modal with details when a product is clicked', async () => {
    const firstProduct = wrapper.find('.product-card')
    await firstProduct.trigger('click')
    const modal = wrapper.findComponent(ProductModal)
    expect(modal.exists()).toBe(true) // Ensure modal is opened
    expect(modal.props().product).toEqual(wrapper.vm.products[0]) // Check correct product details
  })

  it('closes the modal when the close button is clicked', async () => {
    const firstProduct = wrapper.find('.product-card')
    await firstProduct.trigger('click') // Open modal
    const modal = wrapper.findComponent(ProductModal)
    expect(modal.exists()).toBe(true) // Ensure modal is opened

    await modal.vm.$emit('close') // Emit close event
    expect(modal.exists()).toBe(false) // Ensure modal is closed
  })
})
