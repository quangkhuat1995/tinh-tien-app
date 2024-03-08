import { useEffect, useState } from 'react';
import './App.css';

const namesWithAtr1 = [
  {
    name: 'Quang',
    point: 0,
    host: true,
  },
];

export default function App() {
  const [namesWithAtr, setNamesWithAtr] = useState(namesWithAtr1);
  const [name, setName] = useState('');

  useEffect(() => {
    const a = localStorage.getItem('namesWithAtr');
    setNamesWithAtr(JSON.parse(a || '[]'));
  }, []);

  const onClick = (key, name) => {
    if (key === 'plus') {
      const newList = namesWithAtr.map((item) => {
        if (item.name === name) {
          return { ...item, point: item.point + 5 };
        }
        return item;
      });
      setNamesWithAtr(newList);
    } else {
      const newList = namesWithAtr.map((item) => {
        if (item.name === name) {
          return { ...item, point: item.point - 5 };
        }
        return item;
      });
      setNamesWithAtr(newList);
    }
  };

  useEffect(() => {
    localStorage.setItem('namesWithAtr', JSON.stringify(namesWithAtr));
  }, [namesWithAtr]);

  const addNewUsers = () => {
    if (!name) return;
    const newUsers = name.split(',').map((na) => {
      return {
        name: na.trim(),
        point: 0,
        host: false,
      };
    });
    setNamesWithAtr([...namesWithAtr, ...newUsers]);
    setName('');
  };

  const handleBalance = () => {
    const currentBalance = namesWithAtr.reduce((a, b) => a + b.point, 0);
    const newList = namesWithAtr.map((item) => {
      if (item.host) {
        return { ...item, point: item.point - currentBalance };
      }
      return item;
    });
    setNamesWithAtr(newList);
  };

  const handleRemoveUser = (user) => {
    if (user.point !== 0) {
      alert("Please make this user's point to 0 first");
      return;
    }
    if (user.host) {
      alert('This user is host, change the host first');
      return;
    }
    const newList = namesWithAtr.filter((item) => item.name !== user.name);
    setNamesWithAtr(newList);
  };

  return (
    <div className="App">
      <table>
        <tbody>
          {namesWithAtr.map((user) => (
            <tr key={user.name} className={`tr ${user.host ? 'host' : ''}`}>
              <th>{user.name}</th>
              <th style={{ width: '50px' }}>{user.point}</th>
              <th>
                {!user.host && (
                  <button onClick={() => onClick('plus', user.name)}>+</button>
                )}
              </th>
              <th>
                {!user.host && (
                  <button onClick={() => onClick('minus', user.name)}>-</button>
                )}
              </th>
              <th>
                {user.host && <button onClick={handleBalance}>Balance</button>}
              </th>
              <th style={{ width: '150px', marginLeft: '10px' }}>
                <input
                  type="radio"
                  checked={user.host}
                  name="isHost"
                  onChange={() => {
                    const newList = namesWithAtr.map((item) => {
                      if (item.host) {
                        return { ...item, host: false };
                      }
                      if (item.name === user.name) {
                        return { ...item, host: true };
                      }
                      return item;
                    });
                    setNamesWithAtr(newList);
                  }}
                />
              </th>
              <th>
                {/* remove user */}
                <button onClick={() => handleRemoveUser(user)}>Remove</button>
              </th>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        Add users:
        <textarea
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></textarea>
        <button onClick={addNewUsers}>Add</button>
      </div>
      <div>
        <button
          onClick={() => {
            const newList = namesWithAtr.map((item) => {
              return { ...item, point: 0 };
            });
            setNamesWithAtr(newList);
          }}
        >
          Reset
        </button>
      </div>
      Total: {namesWithAtr.reduce((a, b) => a + b.point, 0)}
    </div>
  );
}
