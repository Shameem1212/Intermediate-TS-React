import { useOutletContext } from 'react-router-dom';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] =
    useOutletContext<
      [Candidate[], React.Dispatch<React.SetStateAction<Candidate[]>>]
    >();
  const rejectCandidate = (username: string) => {
    const newSavedCandidates = savedCandidates.filter((curCandidate) => {
      return curCandidate.login !== username;
    });
    setSavedCandidates(newSavedCandidates);
    console.log('deleted candidate');
  };
  return (
    <>
      <h1>Potential Candidates</h1>
      <table>
        <thead>
          <tr>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((curCandidate) => {
            return (
              <tr>
                <td>{curCandidate.login}</td>
                <td>
                  <button onClick={() => rejectCandidate(curCandidate.login)}>
                    <img
                      src="/public/Red-Minus-Symbol-PNG-Image-Background.png"
                      alt="Reject Button"
                      width="40"
                      height="40"
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default SavedCandidates;
