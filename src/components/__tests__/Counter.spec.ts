import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Count from '../Counter.vue'

describe('Count', () => {
  it('renders properly', () => {
    const wrapper = mount(Count)
    expect(wrapper.text()).toMatch('0Increment')
  })
})
