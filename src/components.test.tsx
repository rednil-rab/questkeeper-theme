// @vitest-environment jsdom
import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Button, Dialog, Panel, Tag } from './index';

afterEach(() => {
  cleanup();
  vi.restoreAllMocks();
});

describe('Button', () => {
  it('defaults to type button', () => {
    render(<Button>Go</Button>);
    expect(screen.getByRole('button', { name: 'Go' }).getAttribute('type')).toBe('button');
  });

  it('adds the variant class', () => {
    render(<Button variant="danger">Delete</Button>);
    expect(screen.getByRole('button').className).toBe('button button--danger');
  });

  it('forwards onClick and disabled', () => {
    const onClick = vi.fn();
    render(
      <>
        <Button onClick={onClick}>One</Button>
        <Button disabled>Two</Button>
      </>,
    );
    fireEvent.click(screen.getByRole('button', { name: 'One' }));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect((screen.getByRole('button', { name: 'Two' }) as HTMLButtonElement).disabled).toBe(true);
  });
});

describe('Tag', () => {
  it('defaults to amber and accepts danger and muted', () => {
    render(
      <>
        <Tag>a</Tag>
        <Tag tone="danger">b</Tag>
        <Tag tone="muted">c</Tag>
      </>,
    );
    expect(screen.getByText('a').className).toBe('tag tag--amber');
    expect(screen.getByText('b').className).toBe('tag tag--danger');
    expect(screen.getByText('c').className).toBe('tag tag--muted');
  });
});

describe('Panel', () => {
  it('renders a title only when given', () => {
    const { rerender } = render(<Panel>body</Panel>);
    expect(screen.queryByRole('heading')).toBeNull();
    rerender(<Panel title="Quests">body</Panel>);
    expect(screen.getByRole('heading', { name: 'Quests' }).className).toBe('panel__title');
  });
});

describe('Dialog', () => {
  it('calls showModal once on mount', () => {
    const showModal = vi.fn();
    HTMLDialogElement.prototype.showModal = showModal;
    render(
      <Dialog title="Hi" onClose={() => undefined}>
        x
      </Dialog>,
    );
    expect(showModal).toHaveBeenCalledTimes(1);
  });

  it('does not call showModal when already open', () => {
    const showModal = vi.fn();
    HTMLDialogElement.prototype.showModal = showModal;
    Object.defineProperty(HTMLDialogElement.prototype, 'open', { configurable: true, get: () => true });
    render(
      <Dialog title="Hi" onClose={() => undefined}>
        x
      </Dialog>,
    );
    delete (HTMLDialogElement.prototype as { open?: boolean }).open;
    expect(showModal).not.toHaveBeenCalled();
  });

  it('calls onClose when the dialog fires close', () => {
    HTMLDialogElement.prototype.showModal = vi.fn();
    const onClose = vi.fn();
    const { container } = render(
      <Dialog title="Hi" onClose={onClose}>
        x
      </Dialog>,
    );
    fireEvent(container.querySelector('dialog')!, new Event('close'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
