// To find Longest Sommon Subsequence, example: 昨日は晴れでした + 明日晴れはした -> 日晴れした

function findLCS(s1, s2) {
    const memo = new Array(s1.length + 1).fill(null).map(() => new Array(s2.length + 1).fill(-1));

    function lcsHelper(i, j) {
        if (i === 0 || j === 0) return 0;

        if (memo[i][j] !== -1) return memo[i][j];

        if (s1[i - 1] === s2[j - 1])
            memo[i][j] = 1 + lcsHelper(i - 1, j - 1);
        else
            memo[i][j] = Math.max(lcsHelper(i - 1, j), lcsHelper(i, j - 1));

        return memo[i][j];
    }

    lcsHelper(s1.length, s2.length);

    let i = s1.length, j = s2.length;
    let lcs = "";

    while (i > 0 && j > 0) {
        if (s1[i - 1] === s2[j - 1]) {
            lcs = s1[i - 1] + lcs;
            i--;
            j--;
        } else if (memo[i - 1][j] > memo[i][j - 1])
            i--;
        else
            j--;
    }

    return lcs;
}