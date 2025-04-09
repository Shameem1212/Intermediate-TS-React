import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import { useOutletContext } from 'react-router-dom';

const CandidateSearch = () => {
  const [savedCandidates, setSavedCandidates] =
    useOutletContext<
      [Candidate[], React.Dispatch<React.SetStateAction<Candidate[]>>]
    >();
  const [allCandidateUsernames, setAllCandidateUsernames] = useState([]);
  const [curCandidateIndex, setCurrentCandidateIndex] = useState(0);
  const [curCandidate, setCurCandidate] = useState<Candidate>();

  useEffect(() => {
    const fetchUsers = async () => {
      let result = await searchGithub();
      result = result.map((cand: { login: any }) => {
        return cand.login;
      });
      const firstCandidate = await searchGithubUser(result[0]);
      console.log(firstCandidate);
      setAllCandidateUsernames(result);
      setCurrentCandidateIndex(0);
      setCurCandidate(firstCandidate);
    };
    fetchUsers();
  }, []);

  const nextCandidate = async () => {
    const newCandidate = await searchGithubUser(
      allCandidateUsernames[
        (curCandidateIndex + 1) % allCandidateUsernames.length
      ],
    );
    setCurrentCandidateIndex(
      (curCandidateIndex + 1) % allCandidateUsernames.length,
    );
    setCurCandidate(newCandidate);
  };
  const addCandidate = () => {
    setSavedCandidates([...savedCandidates, curCandidate as Candidate]);
    nextCandidate();
    console.log('Added Candidate');
  };
  const rejectCandidate = () => {
    nextCandidate();
    console.log('Rejected Candidate');
  };
  return (
    <div>
      <h1>CandidateSearch</h1>
      {curCandidate && (
        <div>
          <img src={curCandidate.avatar_url} alt="candidate avatar" />
          <h2>
            {curCandidate.name}({curCandidate.login})
          </h2>
          <h3>
            Email:{' '}
            {curCandidate.email === undefined ||
            curCandidate.email === null ||
            curCandidate.email === ''
              ? 'NA'
              : curCandidate.email}
          </h3>
          <h3>
            Company:{' '}
            {curCandidate.company === undefined ||
            curCandidate.company === null ||
            curCandidate.company === ''
              ? 'NA'
              : curCandidate.company}
          </h3>
          <h3>
            Location:{' '}
            {curCandidate.location === undefined ||
            curCandidate.location === null ||
            curCandidate.location === ''
              ? 'NA'
              : curCandidate.location}
          </h3>
          <h3>
            Bio:{' '}
            {curCandidate.bio === undefined ||
            curCandidate.bio === null ||
            curCandidate.bio === ''
              ? 'NA'
              : curCandidate.bio}
          </h3>
          <button onClick={rejectCandidate}>
            <img
              src="/public/Red-Minus-Symbol-PNG-Image-Background.png"
              alt="No Button"
              width="50"
              height="50"
            />
          </button>
          <button onClick={addCandidate}>
            <img
              src="/public/Green-Add-Button-PNG.png"
              alt="Yes Button"
              width="50"
              height="50"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default CandidateSearch;
