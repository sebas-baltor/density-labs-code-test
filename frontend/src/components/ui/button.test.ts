import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/vue';
import Button from './Button.vue';

describe('Button Component', () => {
  it('renders correctly', () => {
    const { getByText } = render(Button, { props: { label: 'Click Me' } });
    expect(getByText('Click Me')).toBeTruthy();
  });

  it('emits an event when clicked', async () => {
    const { getByText, emitted } = render(Button, { props: { label: 'Click Me' } });
    await getByText('Click Me').click();
    expect(emitted().click).toBeTruthy();
  });
});