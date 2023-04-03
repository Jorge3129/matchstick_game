% 1
%234
%567
% _
%|_|
%|_|

operator(+, [1,1]).
operator(-, [1,0]).

digit(0, [1,1,0,1,1,1,1]).
digit(1, [0,0,0,1,0,0,1]).
digit(2, [1,0,1,1,1,1,0]).
digit(3, [1,0,1,1,0,1,1]).
digit(4, [0,1,1,1,0,0,1]).
digit(5, [1,1,1,0,0,1,1]).
digit(6, [1,1,1,0,1,1,1]).
digit(7, [1,0,0,1,0,0,1]).
digit(8, [1,1,1,1,1,1,1]).
digit(9, [1,1,1,1,0,1,1]).

valid_op([X, +, Y, Z]) :- Z is X + Y.
valid_op([X, -, Y, Z]) :- Z is X - Y.

valid_expr([X, Operator, Y, Z], Expr) :-
    digit(X, Xs),
    digit(Y, Ys),
    digit(Z, Zs),
    operator(Operator, Ops),
    append([Xs, Ops, Ys, Zs], Expr).

solution_all(Puzzle, Solution, Moves) :-
    valid_expr(Puzzle, PuzzleList),
    valid_expr(Solution, SolutionList),
    valid_op(Solution),
    move_one_and_remove(PuzzleList, SolutionList, Moves).

solution_not_equal(Puzzle, Solution, Moves) :-
    valid_expr(Puzzle, PuzzleList),
    \+ valid_op(Puzzle),
    valid_expr(Solution, SolutionList),
    valid_op(Solution),
    move_one_and_remove(PuzzleList, SolutionList, Moves).

% find differences (with indexes) between lists 
diff_indexes([], [], _, Diffs, Diffs).

diff_indexes([H1|T1], [H2|T2], CurIndex, Diffs, Result) :-
    H1 = H2,
    NewIndex is CurIndex + 1,
    diff_indexes(T1, T2, NewIndex, Diffs, Result).

diff_indexes([H1|T1], [H2|T2], CurIndex, Diffs, Result) :-
    H1 \= H2,
    append(Diffs, [[CurIndex, H1, H2]], NewDiffs),
    NewIndex is CurIndex + 1,
    diff_indexes(T1, T2, NewIndex, NewDiffs, Result).

diff_indexes(L1, L2, Result) :-
    diff_indexes(L1, L2, 1, [], Result).

% succeed if two expressions have 1 match moved and 1 removed
move_one_and_remove(E1, E2, Diffs) :- 
    diff_indexes(E1, E2, Diffs),
    length(Diffs, 3),
    sum_list(E1, Sum1),
    sum_list(E2, Sum2),
    Sum1 is Sum2 + 1.
