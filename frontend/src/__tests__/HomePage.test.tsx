import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import HomePage from '../pages/HomePage';
import { act } from 'react-dom/test-utils';

// Mock fetch
global.fetch = jest.fn();

describe('HomePage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.REACT_APP_REQUEST_BASE = 'http://localhost:3000';
  });

  it('renders the title and form', () => {
    render(<HomePage />);
    expect(screen.getByText('Todo App')).toBeInTheDocument();
    expect(screen.getByText('Ajouter une nouvelle tâche')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Entrez le titre de la tâche...')).toBeInTheDocument();
  });

  it('loads todos on initial render', async () => {
    const mockTodos = [
      { id: '1', title: 'Test Todo 1' },
      { id: '2', title: 'Test Todo 2' }
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos
    });

    await act(async () => {
      render(<HomePage />);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/',
        expect.objectContaining({
          method: 'GET',
          headers: expect.any(Object)
        })
      );
    });

    // Should render the todos
    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Test Todo 2')).toBeInTheDocument();
  });

  it('handles add todo', async () => {
    // First call: GET todos (empty)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });
    // Second call: POST new todo
    (global.fetch as jest.Mock).mockResolvedValueOnce({ ok: true });

    render(<HomePage />);

    const input = screen.getByPlaceholderText('Entrez le titre de la tâche...');
    const addButton = screen.getByRole('button', { name: /ajouter la tâche/i });

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3000/',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ title: 'New Todo' })
        })
      );
    });

    // The input should be cleared after adding
    expect(input).toHaveValue('');
  });

  it('handles toggle todo', async () => {
    // First call: GET todos
    const mockTodos = [{ id: '1', title: 'Test Todo' }];
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTodos
    });

    await act(async () => {
      render(<HomePage />);
    });

    // The checkbox should be present
    const checkbox = await screen.findByRole('checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).not.toBeChecked();
  });

  it('handles fetch error when loading todos', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    await act(async () => {
      render(<HomePage />);
    });

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erreur lors du chargement des todos :',
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it('handles fetch error when adding todo', async () => {
    // First call: GET todos (empty)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });
    // Second call: POST fails
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    render(<HomePage />);

    const input = screen.getByPlaceholderText('Entrez le titre de la tâche...');
    const addButton = screen.getByRole('button', { name: /ajouter la tâche/i });

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Erreur lors de l'ajout du todo :",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it('handles non-OK response when adding todo', async () => {
    // First call: GET todos (empty)
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });
    // Second call: POST returns non-OK response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 400
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<HomePage />);

    const input = screen.getByPlaceholderText('Entrez le titre de la tâche...');
    const addButton = screen.getByRole('button', { name: /ajouter la tâche/i });

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(addButton);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erreur lors de l\'ajout du todo :',
        expect.any(Error)
      );
    });

    // Verify the todo was not added to the list
    expect(screen.queryByText('New Todo')).not.toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('should throw error when response is not ok during todo addition', async () => {
    // Mock initial GET request
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => []
    });

    // Mock POST request with non-OK response
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500
    });

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(<HomePage />);

    // Add a new todo
    const input = screen.getByPlaceholderText('Entrez le titre de la tâche...');
    const addButton = screen.getByRole('button', { name: /ajouter la tâche/i });

    fireEvent.change(input, { target: { value: 'Test Todo' } });
    fireEvent.click(addButton);

    // Verify error handling
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Erreur lors de l\'ajout du todo :',
        expect.any(Error)
      );
    });

    // Verify the error message contains the status code
    expect(consoleSpy.mock.calls[0][1].message).toContain('HTTP error! status: 500');

    consoleSpy.mockRestore();
  });
});
