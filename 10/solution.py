from z3 import Int, Solver, sat, Or, Optimize, Sum

def solve_minimize_cost(n, constraints):
    # n is the number of unknown variables
    xs = [Int(f"x_{i}") for i in range(n)]

    opt = Optimize()

    # Each x_i is non-negative
    for x in xs:
        opt.add(x >= 0)

    # Constraints looks like: [{"indices": [1, 4], "value": 10}, ...]
    for c in constraints:
        idxs = c["indices"]
        subset = [xs[i] for i in idxs]
        opt.add(Sum(subset) == c["value"])

    # Objective: minimize the sum of all x_i
    total = Sum(xs)
    opt.minimize(total)

    if opt.check() == sat:
        model = opt.model()
        vals = [model[x].as_long() for x in xs]
        return vals, model.eval(total).as_long()
    else:
        return None, None

# print("Hello, world!")

ex = """[.##.] (3) (1,3) (2) (2,3) (0,2) (0,1) {3,5,4,7}
[...#.] (0,2,3,4) (2,3) (0,4) (0,1,2) (1,2,3,4) {7,5,12,7,2}
[.###.#] (0,1,2,3,4) (0,3,4) (0,1,2,4,5) (1,2) {10,11,11,5,10,5}"""


def solve(data):
    total = 0
    # Note need enumerate to get index
    for i, line in enumerate(data.split("\n")):
        # if i>0:
        #     break
        # print("line", line)
        parts = line.split()
        pattern = parts[0]
        groups = [p for p in parts[1:-1] if p.startswith("(")]
        set_part = parts[-1]
        # print(pattern)
        # print(groups)
        # print(set_part)

        # Represents what each button means: [3,5] means it increments the 4th and 6th registers.
        parsed_groups = []
        for g in groups:
            nums = g.strip("()").split(",")
            parsed_groups.append(tuple(int(n) for n in nums))
        
        # These are the target values we need each "register" to reach:
        values = [int(x) for x in set_part.strip("{}").split(",")]

        # print("parsed_groups",parsed_groups)
        # print("values",values)

        rows = len(values)
        cols = len(parsed_groups)
        m = [[0] * cols for _ in range(rows)]

        # Populate the matrix so that each row represents a constraint: like [0,0,0,1,0,1], this means that 4th and 6th registers are incremented
        for i, grp in enumerate(parsed_groups):
            for x in grp:
                # print(x)
                m[x][i] = 1
       
        # e.g. {indices: [1, 5], value: 10}
        constraints = []

        # rows look like e.g. [0,0,0,1,0,1] -- they track which unknown variables are being summed
        # so now we convert into list of indices of the unknown variables that are summed, in this "equation"
        for r,row in enumerate(m):
            c = []
            for i,x in enumerate(row):
                if x:
                    c.append(i)
            constraints.append({"indices": c, "value": values[r] })

        # print(constraints)

        numUnknowns = len(parsed_groups)
        minCost = solve_minimize_cost(numUnknowns, constraints)
        
        # minCost is a tuple with first value the combo of button pushes, and second value the total cost (their sum)
        total += minCost[1]
        # print(minCost[1])

        # print(minCost)
    return total


def testSolver():
    # Create two integer variables
    x = Int('x')
    y = Int('y')

    # Create a solver instance
    s = Solver()

    # Add some constraints
    s.add(x + y == 10)
    s.add(x > 0)
    s.add(y > 0)

    # Check satisfiability
    # if s.check() == sat:
    #     model = s.model()
    #     print("SAT")
    #     print("x =", model[x])
    #     print("y =", model[y])
    # else:
    #     print("UNSAT")

    solutions = []

    while s.check() == sat:
        model = s.model()
        x_val = model[x].as_long()
        y_val = model[y].as_long()
        print(f"x = {x_val}, y = {y_val}")
        solutions.append((x_val, y_val))

        # Blocking clause: forbid this exact (x, y) pair next time
        s.add(Or(x != x_val, y != y_val))

    print("Done, no more solutions.")

# print(text)



def run():
    # NOTE: Path must be relative to where you run the script from, not from where this script lives
    with open("./10/input.txt", "r") as f:
        text = f.read()
        # text = ex
        print(solve(text))


run()