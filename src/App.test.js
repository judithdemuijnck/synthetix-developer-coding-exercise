import { render, screen, waitFor, waitForElement } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import axios from 'axios';
import { mockSearchResults, mockToken, mockArticle } from './__mocks__/mockData';


jest.mock("axios")

beforeEach(() => {
  // this does not work due to multiple instances of axios
  axios.post.mockImplementation((url) => {
    switch (url) {
      case "https://apisandbox.synthetix.com/2.0/external/session":
        return Promise.resolve(mockToken)
      case "https://apisandbox.synthetix.com/2.0/external/search":
        return Promise.resolve(mockSearchResults)
      case "https://apisandbox.synthetix.com/2.0/external/article":
        return Promise.resolve(mockArticle)
      default:
        return Promise.reject(new Error("not found"))
    }
  })
})

afterEach(() => {
  jest.clearAllMocks()
})

test('Initial render', () => {
  render(<App />);
  const linkElement = screen.getByText(/synthetix/i);
  expect(linkElement).toBeInTheDocument();
});

describe("Search Bar", () => {
  it("updates input value on change", () => {
    render(<App />);
    const searchInputField = screen.getByRole('searchbox', { name: /type your questions here/i })
    expect(searchInputField.value).toBe("")

    userEvent.type(searchInputField, "test")
    expect(searchInputField.value).toBe("test")
  })
})


describe("Clicking search button", () => {
  it("displays search results", async () => {
    render(<App />)
    const searchInputField = screen.getByRole('searchbox', { name: /type your questions here/i })
    const searchBtn = screen.getByRole('button', { name: /click here to search synthetix knowledge base/i })

    userEvent.type(searchInputField, "test")
    userEvent.click(searchBtn)


    const loadingState = await screen.findByRole("heading", { name: /loading search results/i })
    expect(loadingState).toBeInTheDocument()

    // expect(axios).toHaveBeenCalledTimes(1)
    // await screen.findByRole('heading', { name: /automotive: phone test/i })
  })

  describe("Clicking on Article Link", () => {
    it("displays full article", async () => {
      render(<App />)
      // const searchInputField = screen.getByRole('searchbox', { name: /type your questions here/i })
      // const searchBtn = screen.getByRole('button', { name: /click here to search synthetix knowledge base/i })

      // userEvent.type(searchInputField, "test")
      // userEvent.click(searchBtn)


      // const loadingState = await screen.findByRole("heading", { name: /loading search results/i })
      // expect(loadingState).toBeInTheDocument()

      // expect(axios).toHaveBeenCalledTimes(1)
      // const result = await screen.findByRole('heading', { name: /automotive: phone test/i })
      // expect(result).toBeInTheDocument()

      // const articleLink = screen.getByTestId("qed554540")
      // expect(articleLink).toBeInTheDocument()
      // userEvent.click(articleLink)

      // const loadingArticle = await screen.findByRole("heading", { name: /loading.../i })
      // expect(loadingArticle).toBeInTheDocument()

      // expect(axios).toHaveBeenCalledTimes(1)
      // const article = await screen.findByText(/click the number/i)
      // expect(article).toBeInTheDocument()

    })
  })
})