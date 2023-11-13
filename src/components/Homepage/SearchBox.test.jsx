import { act } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import SearchBox from "./SearchBox";

test ("render NavComms", () => {
    render(<SearchBox />);
})