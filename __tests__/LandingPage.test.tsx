import { render, screen } from '@testing-library/react';
import LandingPage from '@/app/page';
import '@testing-library/jest-dom'


describe('LandingPage', () => {
  it('renders homepage unchanged', () => {
    const { container } = render(<LandingPage />);
    expect(container).toMatchSnapshot();
  });

  it('renders the sign up button', () => {
    render(<LandingPage />);
    const signUpButtons = screen.getAllByRole('button', {
      name: /sign up/i,
    });
    expect(signUpButtons.length).toBeGreaterThan(0);
    expect(signUpButtons[0]).toBeInTheDocument();
  });

  it('renders a heading', () => {
    render(<LandingPage />);
    const heading = screen.getByRole('heading', {
      name: /connect, share, surge/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('renders the login button', () => {
    render(<LandingPage />);
    const loginButtons = screen.getAllByRole('button', {
      name: /log in/i,
    });
    expect(loginButtons.length).toBeGreaterThan(0);
  });

  it('renders the get started button', () => {
    render(<LandingPage />);
    const getStartedButton = screen.getByRole('button', {
      name: /get started/i,
    });
    expect(getStartedButton).toBeInTheDocument();
  });

  it('renders the learn more button', () => {
    render(<LandingPage />);
    const learnMoreButton = screen.getByRole('button', {
      name: /learn more/i,
    });
    expect(learnMoreButton).toBeInTheDocument();
  });

  it('renders the features section', () => {
    render(<LandingPage />);
    const featuresHeading = screen.getByRole('heading', {
      name: /features/i,
    });
    expect(featuresHeading).toBeInTheDocument();
  });

  it('renders the ready to surge section', () => {
    render(<LandingPage />);
    const readyToSurgeHeading = screen.getByRole('heading', {
      name: /ready to surge/i,
    });
    expect(readyToSurgeHeading).toBeInTheDocument();
  });

  it('renders the footer', () => {
    render(<LandingPage />);
    const footerText = screen.getByText(/built by/i);
    expect(footerText).toBeInTheDocument();
  });
});