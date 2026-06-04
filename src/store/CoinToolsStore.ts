import { StackId } from 'recharts/types/util/ChartUtils';
import { Position,Todo,ToolsData  } from '../components/coin-page/components/coin-tools/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const EMPTY_TOOLS_DATA: ToolsData = { positions: [], todos: [] }

interface CoinToolsStore {
   coinToolsData: Record<string, ToolsData>
   getCoinData: (coinId: string) => ToolsData

   addPosition: (coinId: string, position: Omit<Position, 'id'>) => void
   removePosition: (coinId: string, positionID: string) => void

   addTodo: (coinId: string, todos: Omit<Todo, 'id'>) => void
   removeTodo: (coinId: string, todoID: string) => void

   updateTodo: (coinId: string, todoID :string, update: Partial<Omit<Todo, 'id'>> ) => void

}

export const useCoinToolsStore = create<CoinToolsStore>()(
   persist((set,get) => ({
         coinToolsData: {},

         getCoinData: (coinId) =>{
            return get().coinToolsData[coinId] ?? EMPTY_TOOLS_DATA
         },

         addPosition: (coinId, position) => {
            const newPosition: Position = {...position, id : crypto.randomUUID()};
            set(state => {
               const coinData = state.coinToolsData[coinId] ?? EMPTY_TOOLS_DATA;
               return{
                  coinToolsData: {
                     ...state.coinToolsData,
                     [coinId]: {
                        ...coinData,
                        positions: [...coinData.positions, newPosition]
                     }
                  }
               }
            })
         },

         removePosition: (coinId, positionID) => {
            set(state => {
               const coinData = state.coinToolsData[coinId] ?? EMPTY_TOOLS_DATA;
               return{
                  coinToolsData: {
                     ...state.coinToolsData,
                     [coinId]: {
                        ...coinData,
                        positions: coinData.positions.filter(p => p.id !== positionID)
                     }
                  }   
               }   
            })   
         },

         addTodo: (coinId, todo) => {
            const newTodo: Todo = {...todo, id : crypto.randomUUID(), date: new Date().toISOString()}
            set(state => {
               const coinData = state.coinToolsData[coinId] ?? EMPTY_TOOLS_DATA;
               return {
                  coinToolsData: {
                     ...state.coinToolsData,
                     [coinId]: {
                        ...coinData,
                        todos: [...coinData.todos, newTodo]
                     }
                  }
               }   
            })
         },

         removeTodo: (coinId, todoID) => {
            set(state => {
               const coinData = state.coinToolsData[coinId] ?? EMPTY_TOOLS_DATA;
               return {
                  coinToolsData: {
                     ...state.coinToolsData,
                     [coinId]: {
                        ...coinData,
                        todos: coinData.todos.filter(t => t.id !== todoID)
                     }
                  }
               }   
            })
         },

         updateTodo: (coinId, todoID, update) => {
            set(state => {
               const coinData = state.coinToolsData[coinId] ?? EMPTY_TOOLS_DATA;
               return {
                  coinToolsData: {
                     ...state.coinToolsData,
                     [coinId]: {
                        ...coinData,
                        todos: coinData.todos.map(todo => 
                           todo.id === todoID ? {...todo, ...update} : todo
                        )
                     }
                  }
               }   
            })
         }


      })
   ,{name: 'CoinToolsData'}   
   )
);